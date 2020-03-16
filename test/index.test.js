const chai = require('chai')
const jobClient = require('../')
const job = new jobClient()

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

describe('Create, read and delete a running job', () => {
    it('Test:  Create a single job', function(done) {
        job.create('default', jobYaml, (res) => {
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
})