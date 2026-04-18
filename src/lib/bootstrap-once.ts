type BootstrapCache = {
  tasks?: Map<string, Promise<void>>;
};

const globalForBootstrap = globalThis as unknown as BootstrapCache;

function getTaskMap() {
  if (!globalForBootstrap.tasks) {
    globalForBootstrap.tasks = new Map<string, Promise<void>>();
  }
  return globalForBootstrap.tasks;
}

export async function runBootstrapOnce(
  key: string,
  task: () => Promise<void>
): Promise<void> {
  const tasks = getTaskMap();
  const existing = tasks.get(key);
  if (existing) {
    await existing;
    return;
  }

  const running = task().catch((error) => {
    tasks.delete(key);
    throw error;
  });
  tasks.set(key, running);
  await running;
}
