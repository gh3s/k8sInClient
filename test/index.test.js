const chai = require('chai')
const { Job, Deployment, CronJob } = require('../')
const job = new Job()
const deployment = new Deployment()
const cronjob = new CronJob()

const assert = chai.assert

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
                        "print bpi(1e5)"
                    ]
                }],
                "restartPolicy": "Never"
            }
        }
    }
}

const deploymentYaml = {
    "apiVersion": "apps/v1",
    "kind": "Deployment",
    "metadata": {
    "name": "nginx-deployment",
    "labels": {
        "app": "nginx"
    }
    },
    "spec": {
    "replicas": 3,
    "selector": {
        "matchLabels": {
        "app": "nginx"
        }
    },
    "template": {
        "metadata": {
        "labels": {
            "app": "nginx"
        }
        },
        "spec": {
        "containers": [
            {
            "name": "nginx",
            "image": "nginx:1.14.2",
            "ports": [
                {
                "containerPort": 55555
                }
            ]
            }
        ]
        }
    }
    }
}

describe('Create, read and delete a running job and deployment', () => {
    /*it('Test:  Create a single job', function(done) {
        job.create('default', jobYaml, (res) => {   //default is the namespace name
            assert.isUndefined(res.body.status.active)
            done()
        })
    })

    it('Test:  Read a single job - active should be true', function(done) {
        this.timeout(0);
        let fn = () => {
            job.read('default', 'pi-with-ttl', (res) => {
                assert.equal(res.body.status.active, 1)
                done()
            })
        }
        setTimeout(fn, 10000)
    })

    it('Test:  Delete a single job', function() {
        this.timeout(0)
        let fn = () => {
            job.delete('default', 'pi-with-ttl', (res) => {
                assert.equal(res.body.status.active, 1)  
            })
        }
        setTimeout(fn, 10000)
    })
    
    it('Test:  Create a single deployment', function(done) {
        deployment.create('default', deploymentYaml, (res) => {   //default is the namespace name
            console.log(res)
            assert.isUndefined(res.body.status.active)
            done()
        })
    })

    it('Test:  Read a single job - active should be true', function(done) {
        this.timeout(0);
        let fn = () => {
            deployment.read('default', 'nginx-deployment', (res) => {
                assert.equal(res.body.status.availableReplicas, 3)
                done()
            })
        }
        setTimeout(fn, 10000)
    })

    it('Test:  Delete a single job', function() {
        this.timeout(0)
        let fn = () => {
            deployment.delete('default', 'nginx-deployment', (res) => {
                assert.equal(res.body.status.availableReplicas, 3)
            })
        }
        setTimeout(fn, 10000)
    })*/

    it('Test:  Read a single cronjob', function() {
        this.timeout(0)
        let fn = () => {
            cronjob.read('default', 'uploader-cronjob-gcp', (res) => {
                console.log(res)
                //assert.equal(res.body.status.availableReplicas, 3)
                //done()
            })
        }
        setTimeout(fn, 1000)
    })

})