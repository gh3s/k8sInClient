const k8s = require('@kubernetes/client-node')

const kc = new k8s.KubeConfig()

// JOBS

class Job {
  /**
   *Creates an instance of client.
   * @param {*} destination is 'cluster' for in-cluster and 'default' for out-cluster clients.
   * @memberof client
   */

  constructor (destination) {
    this.destination = destination
  }

  load () {
    this.destination === 'cluster' ? kc.loadFromCluster() : kc.loadFromDefault()
    return kc.makeApiClient(k8s.BatchV1Api)
  }

  read (namespace, name, fnc) {
    this.load().readNamespacedJob(name, namespace)
      .then(r => fnc(r))
      .catch(e => fnc(e))
  }
  /**
   *
   * @param {*} namespace (eg. 'default')
   * @param {*} bodyJson: the JSON job configurations sended by a POST request
   * @param {*} fnc: callback function
   * @memberof client
   */

  create (namespace, bodyJson, fnc) {
    const data = k8s.dumpYaml(bodyJson)
    const yamlString = k8s.loadYaml(data)
    this.load().createNamespacedJob(namespace, yamlString)
      .then(res => fnc(res))
      .catch(e => fnc(e))
  }

  delete (namespace, name, fnc) {
    this.load().deleteNamespacedJob(name, namespace, true, {}, {}, {}, 'Foreground')
      .then(res => fnc(res))
      .catch(e => fnc(e))
  }
}

// DEPLOYMENTS

class Deployment {
  /**
   *Creates an instance of client.
   * @param {*} destination is 'cluster' for in-cluster and 'default' for out-cluster clients.
   * @memberof client
   */

  constructor (destination) {
    this.destination = destination
  }

  load () {
    this.destination === 'cluster' ? kc.loadFromCluster() : kc.loadFromDefault()
    return kc.makeApiClient(k8s.AppsV1Api)
  }

  read (namespace, name, fnc) {
    this.load().readNamespacedDeployment(name, namespace)
      .then(r => fnc(r))
      .catch(e => fnc(e))
  }

  /**
   *
   * @param {*} namespace (eg. 'default')
   * @param {*} bodyJson: the JSON job configurations sended by a POST request
   * @param {*} fnc: callback function
   * @memberof client
   */

  create (namespace, bodyJson, fnc) {
    const data = k8s.dumpYaml(bodyJson)
    const yamlString = k8s.loadYaml(data)
    this.load().createNamespacedDeployment(namespace, yamlString, true)
      .then(res => fnc(res))
      .catch(e => fnc(e))
  }

  delete (namespace, name, fnc) {
    this.load().deleteNamespacedDeployment(name, namespace, true, {}, {}, {}, 'Foreground')
      .then(res => fnc(res))
      .catch(e => fnc(e))
  }
}

// CRONJOB

class CronJob {
  /**
   *Creates an instance of client.
   * @param {*} destination is 'cluster' for in-cluster and 'default' for out-cluster clients.
   * @memberof client
   */

  constructor (destination) {
    this.destination = destination
  }

  load () {
    this.destination === 'cluster' ? kc.loadFromCluster() : kc.loadFromDefault()
    return kc.makeApiClient(k8s.BatchV1beta1Api)
  }

  read (namespace, name, fnc) {
    this.load().readNamespacedCronJob(name, namespace, true)
      .then(r => fnc(r))
      .catch(e => fnc(e))
  }

  /**
   *
   * @param {*} namespace (eg. 'default')
   * @param {*} bodyJson: the JSON job configurations sended by a POST request
   * @param {*} fnc: callback function
   * @memberof client
   */

  create (namespace, bodyJson, fnc) {
    const data = k8s.dumpYaml(bodyJson)
    const yamlString = k8s.loadYaml(data)
    this.load().createNamespacedCronJob(namespace, yamlString, true)
      .then(res => fnc(res))
      .catch(e => fnc(e))
  }

  delete (namespace, name, fnc) {
    this.load().deleteNamespacedCronJob(name, namespace, true, {}, {}, {}, 'Foreground')
      .then(res => fnc(res))
      .catch(e => fnc(e))
  }
}

// PERSISTENT VOLUME

class PersistentVolume {
  /**
   *Creates an instance of client.
   * @param {*} destination is 'cluster' for in-cluster and 'default' for out-cluster clients.
   * @memberof client
   */

  constructor (destination) {
    this.destination = destination
  }

  load () {
    this.destination === 'cluster' ? kc.loadFromCluster() : kc.loadFromDefault()
    return kc.makeApiClient(k8s.CoreV1Api)
  }

  read (name, fnc) {
    this.load().readPersistentVolume(name, true)
      .then(r => fnc(r))
      .catch(e => fnc(e))
  }

  create (bodyJson, fnc) {
    const data = k8s.dumpYaml(bodyJson)
    const yamlString = k8s.loadYaml(data)
    this.load().createPersistentVolume(yamlString, true)
      .then(res => fnc(res))
      .catch(e => fnc(e))
  }

  delete (name, fnc) {
    this.load().deletePersistentVolume(name, true)
      .then(res => fnc(res))
      .catch(e => fnc(e))
  }
}

// PersistentVolumeClaim

class PersistentVolumeClaim {
  /**
   *Creates an instance of client.
   * @param {*} destination is 'cluster' for in-cluster and 'default' for out-cluster clients.
   * @memberof client
   */

  constructor (destination) {
    this.destination = destination
  }

  load () {
    this.destination === 'cluster' ? kc.loadFromCluster() : kc.loadFromDefault()
    return kc.makeApiClient(k8s.CoreV1Api)
  }

  read (namespace, name, fnc) {
    this.load().readNamespacedPersistentVolumeClaim(name, namespace)
      .then(r => fnc(r))
      .catch(e => fnc(e))
  }

  create (namespace, bodyJson, fnc) {
    const data = k8s.dumpYaml(bodyJson)
    const yamlString = k8s.loadYaml(data)
    this.load().createNamespacedPersistentVolumeClaim(namespace, yamlString)
      .then(res => fnc(res))
      .catch(e => fnc(e))
  }

  delete (namespace, name, fnc) {
    this.load().deleteNamespacedPersistentVolumeClaim(name, namespace, true, {}, {}, {}, 'Foreground')
      .then(res => fnc(res))
      .catch(e => fnc(e))
  }
}

module.exports = { Job, Deployment, CronJob, PersistentVolume, PersistentVolumeClaim }
