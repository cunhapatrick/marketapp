const kue = require('kue')
const redisConfig = require('../../config/redis')
const Sentry = require('@sentry/node')
const jobs = require('../jobs')

const Queue = kue.createQueue({ redis: redisConfig })

Queue.process(jobs.PurchaseMail.key, jobs.PurchaseMail.handle)

Queue.on('error', Sentry.captureException)

module.exports = Queue
