#!/bin/bash

# Create jsonFile
cat >./tests/jsonFile.json <<EOF
    {
        "argv1": "argv",
        "argv2":   "argv",
        "orgVal": "originalValue"
    }
EOF

# Spin up docker test environment
docker build -t jsonmodifier -f ./Dockerfile.test .
docker run -it jsonmodifier


