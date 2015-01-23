module.exports = {
  name: 'sitemap',
  description: 'Grap sitemap.xml from elsewhere',

  pullMap: function(args) {
    var RSVP    = require('rsvp');
    var Promise = RSVP.Promise;
    var request = require('request');

    return new Promise(function(resolve, reject){
      if(args.length > 2){
        reject('Usage: Only allow 2 arguments `build` and/or `sitemap-URL`');
      }else{
        var url = args[0] === 'build' ? args[1] : args[0];
        console.log('Fetching sitemap from '.green + url.green.bold);
        request(url, function(error, response, body){
          if(error){
            reject(error);
          }else{
            console.log('Fetch sitemap complete.'.green);
            resolve(body);
          }
        });
      }
    });
  },
  writeFile: function(xml){
    var RSVP    = require('rsvp');
    var Promise = RSVP.Promise;
    var fs = require('fs');
    var path = require('path');
    var fileLoc = path.join(__dirname, '..', '..','..', '..', 'public', 'sitemap.xml');
    
    console.log('Writing sitemap to '.green + fileLoc.green.bold);
    return new Promise(function(resolve, reject){
      fs.writeFile(fileLoc, xml, function(err){
        if(err){
          reject(err)
        }else{
          console.log('Sitemap written to '.green + fileLoc.green.bold);
          resolve();
        }
      });
    });
  },
  triggerBuild: function(commandOptions) {
    var BuildTask = this.tasks.Build;
    var buildTask = new BuildTask({
      ui: this.ui,
      analytics: this.analytics,
      project: this.project
    });

    commandOptions.environment = commandOptions.environment || 'production';
    commandOptions.outputPath = 'dist';
    return buildTask.run(commandOptions);
  },

  run: function(options, rawArgs) {
    console.log('Rans', options, rawArgs)
    var self = this;
    if(rawArgs.indexOf('build') > -1){
      return self.pullMap(rawArgs).then(function(xmlDate){
        return self.writeFile(xmlDate);
      }).then(function(){
        return self.triggerBuild(options);
      });
    }else{
      return self.pullMap(rawArgs).then(function(xmlDate){
        return self.writeFile(xmlDate);
      });
    }
    
  }
};