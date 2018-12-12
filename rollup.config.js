import babel from 'rollup-plugin-babel';
// import pkg from './package.json'

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/wtopology.js',
        name: 'wtopology',
        format: 'umd',
        banner: `/*  */`,
        globals:{
            d3:'d3'
        }
    },
    plugins: [babel({
        presets: [['@babel/preset-env', {
            modules: false
        }]]
    })],
    external: ['d3'],
};