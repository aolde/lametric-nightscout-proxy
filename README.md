<!-- ![Logo lametric-nightscout-proxy](https://github.com/aolde/lametric-nightscout-proxy/blob/main/assets/logo.png?raw=true) -->

# lametric-nightscout-proxy

[![Release](https://github.com/aolde/lametric-nightscout-proxy/actions/workflows/release.yml/badge.svg)](https://github.com/aolde/lametric-nightscout-proxy/actions/workflows/release.yml)

This repository contains a backend server that is used to transform data from a Nightscout API to a format that a LaMetric app can read. 

## LaMetric App

| App showcase | |
| ----------- | ----------- |
| Current glucose | Target in range |
| ![Glucose](assets/glucose.jpg) | ![Target in range](assets/inrange.jpg) |
| Insulin on board | Minutes since last value |
| ![Glucose](assets/iob.jpg) | ![Glucose](assets/minutes.jpg) |
| App settings |  |
| ![Glucose](assets/settings.jpg) |  |

## Docker

```
docker pull ghcr.io/aolde/lametric-nightscout-proxy
```

```
docker run --rm --name lametric-nightscout-proxy \
    -p 3000:80 \
    ghcr.io/aolde/lametric-nightscout-proxy
```

```
curl http://localhost:3000/
```

## Helm

```console
helm repo add aolde https://aolde.github.com/helm
helm install -f values.yaml lametric-nightscout-proxy aolde/lametric-nightscout-proxy
```

See more info in the [helm chart](https://github.com/aolde/helm/tree/main/charts/lametric-nightscout-proxy).
