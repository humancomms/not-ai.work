(() => {
  const root = document.documentElement;
  const key = 'notai-theme';
  const systemTheme = () => matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  let theme;
  try { theme = localStorage.getItem(key); } catch {}
  if (theme !== 'light' && theme !== 'dark') theme = systemTheme();

  root.dataset.theme = theme;
  root.style.colorScheme = theme;

  addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.theme-toggle');
    const icon = button?.querySelector('span');
    if (!button || !icon) return;

    const sync = () => {
      const dark = root.dataset.theme === 'dark';
      icon.textContent = dark ? '☀' : '☾';
      const next = dark ? 'light' : 'dark';
      button.setAttribute('aria-label', `Switch to ${next} theme`);
      button.title = `Switch to ${next} theme`;
    };

    button.addEventListener('click', () => {
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      root.style.colorScheme = next;
      try { localStorage.setItem(key, next); } catch {}
      sync();
    });

    sync();
  });
})();
