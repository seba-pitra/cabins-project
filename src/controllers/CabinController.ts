import CabinService from "@/services/CabinService";

export default class CabinController {
  private cabinService: CabinService;

  constructor(cabinService: CabinService) {
    this.cabinService = cabinService
  }

  getCabins() {}

  createCabin() {}

  updateCabin() {}

  deleteCabin() {}
};