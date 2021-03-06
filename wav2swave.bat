@echo off
if exist node_modules/ (
node bin/swave.js
) else (
npm install && node bin/swave.js
)