const aliases = (prefix = 'src') => ({
  '@store': `${prefix}/store`,
  '@modules': `${prefix}/modules`,
  '@components': `${prefix}/components`,
  '@services': `${prefix}/services`,
  '@config': `${prefix}/config`,
  '@utils': `${prefix}/utils`,
  '@hooks': `${prefix}/hooks`,
  '@assets': `${prefix}/assets`,
});

module.exports = aliases;
