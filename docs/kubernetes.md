# Kubernetes

## Overview

The repository includes a Kubernetes setup under k8s/ to demonstrate cluster-style deployment for the application. These resources are basic deployment manifests and are intended as a deployment example rather than a full production cluster design.

## Resource Structure

The kustomization file loads these resources:

- namespace.yaml
- mongodb/pvc.yaml
- mongodb/deployment.yaml
- mongodb/service.yaml
- rabbitmq/deployment.yaml
- rabbitmq/service.yaml
- catalog/deployment.yaml
- catalog/service.yaml
- order/deployment.yaml
- order/service.yaml
- rating/deployment.yaml
- rating/service.yaml
- notification/deployment.yaml
- notification/service.yaml
- api-gateway/deployment.yaml
- api-gateway/service.yaml
- frontend/deployment.yaml
- frontend/service.yaml

## Namespace

The namespace is defined as:

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: cake-delight
```

All resources are grouped under the cake-delight namespace.

## Persistent Storage

MongoDB uses a persistent volume claim in the Kubernetes manifests so data can survive pod restarts within the cluster environment.

Example pattern:

```yaml
volumeMounts:
  - name: mongodb-storage
    mountPath: /data/db
volumes:
  - name: mongodb-storage
    persistentVolumeClaim:
      claimName: mongodb-pvc
```

## Service Discovery

Kubernetes services provide stable internal names for microservice discovery. For example, the API gateway is configured to call:

- http://catalog-service:3001
- http://order-service:3002
- http://rating-service:3003
- http://notification-service:3004

This matches the same service-name pattern used in Docker Compose.

## Frontend Exposure

The frontend service is defined as a NodePort:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: frontend
spec:
  type: NodePort
  selector:
    app: frontend
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
      nodePort: 30080
```

This exposes the frontend externally at:

```text
http://localhost:30080
```

## Deployment Pattern

Each microservice uses a Deployment with one replica and a container image such as:

- cake-api-gateway
- cake-catalog
- cake-order
- cake-rating
- cake-notification
- cake-frontend
- mongo

The exact image names depend on how the local cluster is built and loaded, but the pattern is consistent with a basic Kubernetes deployment configuration.

## How it Works

1. Kubernetes creates the namespace.
2. Persistent storage is created for MongoDB.
3. MongoDB and RabbitMQ deployments start.
4. Application service deployments start in the same namespace.
5. Services route traffic to pods based on labels.
6. The frontend becomes reachable through the NodePort service.

## Practical Notes

This Kustomize setup is suitable for a learning/demo deployment. It does not include:

- ingress controllers
- secrets management
- health probes
- readiness/liveness tuning
- autoscaling
- advanced networking policies
- multiple replicas with rolling updates
- centralized logging and monitoring

## Deployment Commands

From the project root:

```bash
docker compose build
kubectl apply -k k8s/
```

Check status:

```bash
kubectl get pods -n cake-delight
```

Remove the deployment:

```bash
kubectl delete namespace cake-delight
```
