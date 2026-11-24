
export class User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: number;
  street: string;
  houseNo: string;
  zipCode: string;
  city: string;
  phoneNumber: string;
  jobTitle: string;
  company: string;
  department: string;
  workEmail: string;
  workPhone: string;

  constructor(obj?: Partial<User>) {
    this.id = obj?.id ?? '';
    this.firstName = obj?.firstName ?? '';
    this.lastName = obj?.lastName ?? '';
    this.email = obj?.email ?? '';
    this.birthDate = obj?.birthDate ?? 0;
    this.street = obj?.street ?? '';
    this.houseNo = obj?.houseNo ?? '';
    this.zipCode = obj?.zipCode ?? '';
    this.city = obj?.city ?? '';
    this.phoneNumber = obj?.phoneNumber ?? '';
    this.jobTitle = obj?.jobTitle ?? '';
    this.company = obj?.company ?? '';
    this.department = obj?.department ?? '';
    this.workEmail = obj?.workEmail ?? '';
    this.workPhone = obj?.workPhone ?? '';
  }
}

