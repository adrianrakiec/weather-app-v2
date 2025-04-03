export const convertObjectIntoFormData = (
  obj: Record<string, any>,
  form = new FormData(),
  namespace?: string
): FormData => {
  const fd = form || new FormData();
  let formKey;

  for (const property in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, property)) {
      if (namespace) {
        formKey =
          obj instanceof Array
            ? `${namespace}[${property}]`
            : `${namespace}.${property}`;
      } else {
        formKey = property;
      }

      if (obj[property] instanceof Object && !(obj[property] instanceof File)) {
        convertObjectIntoFormData(obj[property], fd, property);
      } else {
        fd.append(formKey, obj[property]);
      }
    }
  }

  return fd;
};
