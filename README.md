![Logo lametric-nightscout-proxy](https://github.com/aolde/lametric-nightscout-proxy/blob/main/assets/logo.png?raw=true)

# lametric-nightscout-proxy

Proxy web server used to transform Nightscout data to the LaMetric app.

## Docker

```
docker pull aolde/lametric-nightscout-proxy
```

```
docker run --rm --name lametric-nightscout-proxy \
    -p 3001:80 \
    aolde/lametric-nightscout-proxy
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
