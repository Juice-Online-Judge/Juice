module.exports = ({types: t, template}) => {
  const loadableTpl = template(
    `_Loadable({
      loader: LOADER,
      webpackRequireWeakId: () => require.resolveWeak(MODULE),
      LoadingComponent
    })`
  )

  const importSpecifier = t.importSpecifier(
    t.identifier('LoadingComponent'),
    t.identifier('LoadingComponent')
  )

  return {
    name: 'transform-loadable',
    visitor: {
      ImportDeclaration (path, file) {
        const {value: source} = path.node.source
        if (source !== 'lib/loadable') {
          return
        }
        const specifier = path
          .get('specifiers')
          .find(specifier => specifier.isImportDefaultSpecifier())
        if (!specifier) {
          return
        }
        file.addImport('react-loadable', 'default', 'Loadable')
        const binding = path.scope.getBinding(specifier.node.local.name)
        binding.referencePaths.forEach(refPath => {
          const calle = refPath.parentPath
          if (!calle.isCallExpression()) {
            return
          }
          const arg = calle.get('arguments.0')

          if (arg && !arg.isArrowFunctionExpression()) {
            throw calle.buildCodeFrameError(
              'Except an arrow function as argument'
            )
          }

          let dynamicImport

          arg.traverse({
            Import (path) {
              dynamicImport = path.parentPath
              path.stop()
            }
          })

          if (!dynamicImport) {
            return
          }

          const mod = dynamicImport.get('arguments.0')

          calle.replaceWith(
            loadableTpl({
              LOADER: arg,
              MODULE: mod
            })
          )
        })
        specifier.replaceWith(importSpecifier)
      }
    }
  }
}
