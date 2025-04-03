import type { ComponentPublicInstance } from 'vue';

const formatComponentName = (instance: ComponentPublicInstance) => {
  if (instance.$root === instance) {
    return 'root instance';
  }

  const name = instance.$options.name || instance.$options._componentTag;

  return (
    (name ? `component <${name}>` : 'anonymous component') +
    (instance.$options.__file ? ` at ${instance.$options.__file}` : '')
  );
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.warnHandler = (message, instance, trace) => {
    const ignoredWarnings = [
      'id you forget @ or : in front of your prop?',
      'Non-function value encountered for default slot. Prefer function slots for better performance',
      'Invoke the slot function inside the render function instead. ',
      'invoked outside of the render function: this will not track dependencies used in the slot.',
    ];

    if (ignoredWarnings.some((warning) => message.includes(warning))) {
      return;
    }

    const warnArgs = [`[Vue warn]: ${message}`];

    if (instance) {
      warnArgs.push(`\n\nFound in component:`);

      let cur: ComponentPublicInstance | null = instance;

      while (cur) {
        warnArgs.push(`--> ${formatComponentName(cur)}`);
        cur = cur.$parent;
      }
    }

    if (trace) {
      warnArgs.push(`\n${trace}`);
    }

    console.warn(...warnArgs);
  };
});
