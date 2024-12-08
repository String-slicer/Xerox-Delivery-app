const FileAccess=artifacts.require('FileAccess');

module.exports=function(deployer){
    deployer.deploy(FileAccess);
}