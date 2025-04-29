export interface ISubscription {
  id: string;
  stripeCustomerId: string;
  subscriptionId?: string;
  isActive: boolean;
  activatedAt?: Date;
  expiresAt?: Date;
  lastPaymentAt?: Date;
  entityType: "user" | "organization";
  entityId: string;
}
