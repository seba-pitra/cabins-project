import AdminService from "@/services/AdminService";

export default class AdminController {
  private adminService: AdminService;

  constructor(adminService: AdminService) {
    this.adminService = adminService;
  }

  getAdminData() {}

  updateAdminData() {}
}