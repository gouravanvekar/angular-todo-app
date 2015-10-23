'use strict';

var expect = require('chai').expect;
var api = require('../lib/spitfire-express')('spitfire-express-test');
var mongojs = require('mongojs');
var express = require('express');
var request = require('supertest');
var bodyParser = require('body-parser');

describe('Connection', function () {
  var database = 'spitfire-express-test';
  var resource = 'forums';
  var db = mongojs(database);
  var forum;
  var topic;
  var post;
  var app = express();
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));

  // parse application/json
  app.use(bodyParser.json());

  before(function (done) {
    var forums = db.collection('forums');
    var topics = db.collection('topics');
    var posts = db.collection('posts');
    forums.insert({name: 'forum 1'},function (err, forum_doc) {
      forum = forum_doc;
      topics.insert({name: 'topic 1', forum_id: forum_doc._id}, function (err, topic_doc){
        topic = topic_doc;
        posts.insert({name: 'post 1', topic_id: topic_doc._id}, function (err, post_doc){
          post = post_doc;
          done();
        });
      });
    });

    app.use('/api', api);
  });

  after(function (done) {
    db.dropDatabase();
    db.close();
    done();
  });

  describe('SpitfireExpress', function(){
    describe('GET /api/forums', function(){
      it('gets a list of resources', function(done){
        request(app)
        .get('/api/forums')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done)
        .expect(function (res) {
          var body = res.body[res.body.length - 1];
          if (body._id.toString() !== forum._id.toString()) {
            return body._id.toString() + ' is not ' + forum._id.toString();
          }
        });
      });
    });
    describe('GET /api/forums/:id', function(){
      it('gets a single resource', function(done){
        request(app)
        .get('/api/forums/' + forum._id.toString())
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done)
        .expect(function (res) {
          var body = res.body;
          if (body._id.toString() !== forum._id.toString()) {
            return body._id.toString() + ' is not ' + forum._id.toString();
          }
        });
      });
    });
    describe('GET /api/forums/:id/topics', function(){
      it('gets a nested resource', function(done){
        request(app)
        .get('/api/forums/' + forum._id.toString() + '/topics')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done)
        .expect(function (res) {
          var body = res.body[0];
          if (body.forum_id.toString() !== forum._id.toString()) {
            return body.forum_id.toString() + ' is not ' + forum._id.toString();
          }
        });
      });
    });
    describe('POST /api/forums', function(){
      it('posts a resource', function(done){
        request(app)
        .post('/api/forums')
        .send({name: 'forum 2'})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done)
        .expect(function (res) {
          var body = res.body;

          if (!body.hasOwnProperty('_id') || body.name !== 'forum 2') {
            return "not returning the created resource";
          }
        });
      });
    });
    describe('POST /api/forums/:id/topics', function(){
      it('posts a nested resource', function(done){
        request(app)
        .post('/api/forums/' + forum._id.toString() + '/topics')
        .send({name: 'topic 2'})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done)
        .expect(function (res) {
          var body = res.body;

          if (!body.hasOwnProperty('_id') || body.name !== 'topic 2') {
            return "not returning the created resource";
          }
          if (body.forum_id.toString() !== forum._id.toString()) {
            return body.forum_id.toString() + ' is not ' + forum._id.toString();
          }
        });
      });
    });
    describe('PUT /api/forums/:id', function () {
      it('updates a resource', function (done) {

        request(app)
        .put('/api/topics/' + topic._id.toString())
        .send({name: 'topic 2', forum_id: forum._id})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done)
        .expect(function (res) {
          var body = res.body;

          if (body.name !== 'topic 2' || body.forum_id.toString() !== topic.forum_id.toString()) {
            return "not returning the updated resource";
          }
        });
      });
    });
    describe('DELETE /api/forums/:id', function () {
      it('deletes a resource', function (done) {

        request(app)
        .delete('/api/topics/' + topic._id.toString())
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done)
        .expect(function (res) {
          var body = res.body;

          if (body.removed !== true) {
            return "resource not removed";
          }
        });
      });
    });
  });
});
