@echo off
if exist node_modules/ (
node .
) else (
npm install && node bin/swave.js
)