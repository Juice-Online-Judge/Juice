export default function transformer (file, api) {
  const j = api.jscodeshift

  const source = j(file.source)
  source
    .find(j.ImportDeclaration)
    .filter(path => path.node.source.value === 'decko')
    .remove()

  source
    .find(j.Decorator)
    .filter(path => {
      return path.node.expression.name === 'bind'
    })
    .map(path => path.parent)
    .replaceWith(path => {
      return j.classProperty(
        path.node.key,
        j.arrowFunctionExpression(
          path.node.value.params,
          path.node.value.body,
          false
        ),
        null,
        false
      )
    })

  return source.toSource()
}
