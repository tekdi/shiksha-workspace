import Cookies from "js-cookie";
import { fetchTenantConfig, TenantConfig } from "@/utils/fetchTenantConfig";

class TenantService {
  private static instance: TenantService;
  private tenantId: string = "";
  private tenantConfig: TenantConfig | null = null;

  private constructor() {
    this.tenantId = Cookies.get("tenantId") || process.env.NEXT_PUBLIC_TENANT_ID || "";
  }

  public static getInstance(): TenantService {
    if (!TenantService.instance) {
      TenantService.instance = new TenantService();
    }
    return TenantService.instance;
  }

  public getTenantId(): string {
    return this.tenantId;
  }

  public async getTenantConfig(): Promise<TenantConfig> {
    if (!this.tenantConfig) {
      this.tenantConfig = await fetchTenantConfig(this.tenantId);
    }
    if (!this.tenantConfig) {
      throw new Error("Failed to fetch tenant configuration");
    }
    return this.tenantConfig;
  }
}

export default TenantService.getInstance();
