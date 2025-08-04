import fetch from "node-fetch";

export default (app) => {
  app.on("push", async (context) => {
    const ref = context.payload.ref;
    if (ref !== "refs/heads/main") return;

    const owner = context.payload.repository.owner.login;
    const repo = context.payload.repository.name;

    try {
      app.log.info(`Fetching all commits on main branch...`);

      const commits = await context.octokit.paginate(
        context.octokit.repos.listCommits,
        {
          owner,
          repo,
          sha: "main",
        }
      );

      app.log.info(`Total commits on main: ${commits.length}`);

      const formattedCommits = commits.map((c) => ({
        author: c.commit.author.name,
        message: c.commit.message,
      }));

      // Convert to string like: "- abc123: message (Author)"
      const commitsAsString = formattedCommits
        .map((c) => `- ${c.message}:(${c.author})`)
        .join("\n");

      // Optional: log it like Python
      app.log.info(`XXXX # ${commitsAsString}"`);


      // Send to FastAPI
      const response = await fetch("http://assistant:8000/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          commits: commitsAsString, // Now a string
        }),
      });


      const data = await response.json();
      const llmResponse = data.response || "🤖 Sorry, I couldn't generate a response.";

      // Create a comment on the latest commit’s issue or PR
      const latestSha = context.payload.after;
      await context.octokit.repos.createCommitComment({
        owner,
        repo,
        commit_sha: latestSha,
        body: llmResponse,
      });

    } catch (error) {
      app.log.error("Failed during changelog generation:");
      app.log.error(error);
    }
  });
};
