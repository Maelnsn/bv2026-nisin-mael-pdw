import { Entity, Index, ForeignKey, Column } from 'typeorm';
import { BasePersistenceEntity } from '@common/database/base/base-persistence.entity';
import { AccountEntity } from '@core/account/data/entity/account.entity';
import { ULID_LENGTH } from '@common/database/identifier/ulid-util';

@Entity({ name: 'password_credential' })
@Index('uq_password_credential_account_id', ['accountId'], { unique: true })
@ForeignKey(() => AccountEntity, ['accountId'], ['id'])
export class PasswordCredentialEntity extends BasePersistenceEntity {
  @Column({ name: 'account_id', type: 'varchar', length: ULID_LENGTH })
  accountId!: string;
  @Column({ name: 'password_hash', type: 'text' })
  passwordHash!: string;
  @Column({ name: 'hash_version', type: 'varchar', length: 32 })
  hashVersion!: string;
  @Column({ name: 'failed_attempts', type: 'integer', default: 0 })
  failedAttempts!: number;
  @Column({ name: 'locked_until', type: 'timestamptz', nullable: true })
  lockedUntil!: Date | null;
  @Column({ name: 'changed_at', type: 'timestamptz' })
  changedAt!: Date;
  @Column({ name: 'disabled_at', type: 'timestamptz', nullable: true })
  disabledAt!: Date | null;
}
