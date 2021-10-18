![Logo template-nodejs-ts-api-docker](https://github.com/aolde/template-nodejs-ts-api-docker/blob/main/assets/logo.png?raw=true)

# template-nodejs-ts-api-docker

Description of project here.

## Docker

```
docker pull aolde/template-nodejs-ts-api-docker
```

```
docker run --rm --name template-nodejs-ts-api-docker \
    -p 3001:80 \
    aolde/template-nodejs-ts-api-docker
```

```
curl http://localhost:3000/
```

## Helm

```console
helm repo add aolde https://aolde.github.com/helm
helm install -f values.yaml template-nodejs-ts-api-docker aolde/template-nodejs-ts-api-docker
```

See more info in the [helm chart](https://github.com/aolde/helm/tree/main/charts/template-nodejs-ts-api-docker).
