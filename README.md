# Kubernetes In-Cluster Client

> Dedicated in-cluster client for object management

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/gh3s/k8sinclient/graphs/commit-activity)
[![HitCount](https://img.shields.io/github/issues/gh3s/4crud/total.svg)](http://hits.dwyl.io/GH3S/K8SINCLIENT)
[![HitCount](http://hits.dwyl.io/GH3S/K8SINCLIENT.svg)](http://hits.dwyl.io/GH3S/K8SINCLIENT)
[![npm](https://img.shields.io/npm/dw/k8sinclient)](https://www.npmjs.com/package/k8sinclient)

Using k8sInClient you get ready to create, kill and search for resources in your cluster like processes inside a PC.

## GETTING STARTED

Before install please install [docker](https://docs.docker.com/get-docker/) and [kubernetes](https://kubernetes.io/docs/setup/).

### Prerequisites

* nodejs 12.x +
* docker
* kubernetes

### Installing

```sh
npm install k8sinclient --save
```

### Testing

This project uses Mocha-Chai combination in /test folder
```sh
npm test
```

## EXAMPLES
### Inserting a job

```javascript
const Client = require('k8sinclient')
const { Job } = require('../')
const job = new Job()

const jobYaml = {
    "apiVersion": "batch/v1",
    "kind": "Job",
    "metadata": {
        "name": "pi-with-ttl"
    },
    "spec": {
        "ttlSecondsAfterFinished": 10,
        "template": {
            "spec": {
                "containers": [{
                    "name": "pi",
                    "image": "perl",
                    "command": [
                        "perl",
                        "-Mbignum=bpi",
                        "-wle",
                        "print bpi(2000)"
                    ]
                }],
                "restartPolicy": "Never"
            }
        }
    }
}

job.create('default', jobYaml, (res) => console.log(res.body.metadata))

```
### To get a job
```javascript
const Client = require('k8sinclient')
const client = new Client()
  
job.read('default', 'pi-with-ttl', (res) => console.log(res.body))
```

### To delete a job
```javascript
const Client = require('k8sinclient')
const client = new Client()
  
job.delete('namespace', 'job', (res) => console.log(res.body))
```

>NOTE: For other resources, just use ``` <object>.<action> ```

Where implemented ***object*** is instantiated of:
1. Job()
2. CronJob()
3. Deployment()

And implemented ***action*** is
1. create (message, callback)
2. read (message, callback)
3. delete (message, callback)

## Running

```sh
npm start
```

## Release History

* 0.0.1
    * CHANGE: Work in progress
* 0.1.0
    * ADD: Cronjob and deployment objects


## Authors

* **GH3S** - *Initial work*  - gh3s@protonmail.ch

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Contributing
1. Fork it (<https://github.com/gh3s/k8sinclient/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request