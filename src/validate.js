export function validate (rls, src) {
  const exceptions = [];

  const keysToCheck = Object.keys(rls)

  keysToCheck.every((fn) => {
     if (!typeof rls[fn] !== 'function') new TypeError(`${fn} is not a function`)
  })

  keysToCheck.forEach((key) => {
    let validators = Array.isArray(rls[key]) ? rls[key] : [rls[key]];
    for (let fn of validators) {
      if (!(fn(src[key]))) {
        exceptions.push({ [key]: `failed on ${fn.name}` })
      }
    }
  })

  return {
    src,
    exceptions
  }
}
