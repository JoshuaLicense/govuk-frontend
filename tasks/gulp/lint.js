'use strict'

const gulp = require('gulp')
const { spawn } = require('child_process')

gulp.task('js:lint', (done) => {
  const lint = spawn('npm', ['run', 'lint:js', '--silent'])
  lint.stdout.on('data', (data) => console.log(data.toString()))
  lint.stderr.on('data', (data) => console.error(data.toString()))
  lint.on('exit', done)
})

gulp.task('scss:lint', (done) => {
  const lint = spawn('npm', ['run', 'lint:scss', '--silent'])
  lint.stdout.on('data', (data) => console.log(data.toString()))
  lint.stderr.on('data', (data) => console.error(data.toString()))
  lint.on('exit', done)
})
