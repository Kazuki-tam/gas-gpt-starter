// push.ts - Execute clasp push and terminate the process after completion

const command = new Deno.Command("deno", {
  args: [
    "run",
    "--allow-env",
    "--allow-net",
    "--allow-read",
    "--allow-sys",
    "--allow-write",
    "--allow-ffi",
    "npm:@google/clasp@2.4.2",
    "push",
    "-f",
  ],
  stdout: "piped",
  stderr: "piped",
});

const process = command.spawn();
const { stdout, stderr } = await process.output();

// Output the result
console.log(new TextDecoder().decode(stdout));
console.error(new TextDecoder().decode(stderr));

// Force exit after push is complete
setTimeout(() => {
  Deno.exit(0);
}, 1000); // Wait 1 second to ensure output is displayed
