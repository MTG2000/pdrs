const AdminDomain = require("../DomainLayer/admin.repository");

class AdminService {
  getNewAccountRequests = async () => {
    return await AdminDomain.getNewAccountRequests();
  };

  getNewMessages = async () => {
    return await AdminDomain.getNewMessages();
  };

  markMessageRead = async id => {
    return await AdminDomain.markMessageRead(id);
  };

  markAccountRequestRead = async id => {
    return await AdminDomain.markAccountRequestRead(id);
  };
}

module.exports = new AdminService();
