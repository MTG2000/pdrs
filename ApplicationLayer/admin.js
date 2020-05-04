const AdminDomain = require("../DomainLayer/admin.repository");
const date = require("date-and-time");

class AdminService {
  getNewAccountRequests = async () => {
    return await AdminDomain.getNewAccountRequests();
  };

  getNewMessages = async () => {
    return await AdminDomain.getNewMessages();
  };

  markMessageRead = async (id) => {
    return await AdminDomain.markMessageRead(id);
  };

  markAccountRequestRead = async (id) => {
    return await AdminDomain.markAccountRequestRead(id);
  };

  getPrescriptionsUsage = async () => {
    const now = new Date();
    //6 months ago
    let before = new Date(now.getFullYear(), now.getMonth());
    before = date.addMonths(before, -6);
    before = date.format(before, "YYYY-MM-DD");
    const mothsUsage = await AdminDomain.getAllPrescriptionsAfter(before);

    const result = {};
    before = new Date(before);
    for (let i = 0; i <= 6; i++) {
      let dateStr = before.toISOString().split("T")[0];
      //without days
      dateStr = dateStr.slice(0, dateStr.lastIndexOf("-"));
      result[dateStr] = 0;
      before = date.addMonths(new Date(before), 1);
    }

    for (const prescriptionsPerMonth of mothsUsage) {
      result[prescriptionsPerMonth.Date] = prescriptionsPerMonth.Count;
    }

    return result;
  };

  getPrescriptionsPerClassificationCount = async (from, to) => {
    return await AdminDomain.getPrescriptionsPerClassificationCount(from, to);
  };

  getMedicinsUsageCount = async (from, to) => {
    return await AdminDomain.getMedicinsUsageCount(from, to);
  };
}

module.exports = new AdminService();
