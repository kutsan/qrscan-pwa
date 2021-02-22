require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  extends: [
    require.resolve('@kutsan/config/eslint'),
    require.resolve('@kutsan/config/eslint/ts'),
    require.resolve('@kutsan/config/eslint/tsx')
  ]
}
