var ini = require('ini')

var helpers = {
   configString: "",
createGdeployConfig: function(glusterModel, filePath){
   
   //TODO - Need a better way to create the gdeploy config files
    this.appendLine('[hosts]')
    glusterModel.hosts.forEach(function(host) {
       this.appendLine(host)
    }, this);
    this.appendLine('[yum1]')
    this.appendLine('action=install')
    this.appendLine('gpgcheck=no')
    this.appendLine('action=install')
    this.appendLine('repos=' + glusterModel.repos)
    this.appendLine('packages=' + glusterModel.packages)
    this.appendLine(' ')
    this.writeConfigFile(filePath)
    return this.configString
},
writeConfigFile: function(filePath){
cockpit.file(filePath).replace(this.configString)
    .done(function (tag) {
       console.log("Done writing file : ")
    })
    .fail(function (error) {
        console.log("Failed to write file : ")
    });  
},
appendLine(newLine){
    this.configString += '\n' + newLine
}
}
module.exports = helpers