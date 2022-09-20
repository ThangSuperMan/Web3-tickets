const ConvertLib = artifacts.require("ConvertLib");
const MetaCoin = artifacts.require("MetaCoin");
const Tickets = artifacts.require("Tickets");
const Bananas = artifacts.require("Bananas");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(MetaCoin);
  deployer.deploy(Tickets);
  deployer.deploy(Bananas);
};
