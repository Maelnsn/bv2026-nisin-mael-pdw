import { Entity, Index, ForeignKey, Column } from 'typeorm';
import { BasePersistenceEntity } from '@common/database/base/base-persistence.entity';
import { AccountEntity } from '@core/account/data/entity/account.entity';
import { ULID_LENGTH } from '@common/database/identifier/ulid-util';

@Entity({ name: 'auth_session' })
@Index('idx_auth_session_account_id', ['accountId'])
@ForeignKey(() => AccountEntity, ['accountId'], ['id'])
export class AuthSessionEntity extends BasePersistenceEntity {
  @Column({ name: 'account_id', type: 'varchar', length: ULID_LENGTH })
  accountId!: string;
  @Column({ name: 'access_version', type: 'integer', default: 1 })
  accessVersion!: number;
  @Column({ name: 'csrf_token_hash', type: 'varchar', length: 64 })
  csrfTokenHash!: string;
  @Column({ name: 'last_used_at', type: 'timestamptz' })
  lastUsedAt!: Date;
  @Column({ name: 'expires_at', type: 'timestamptz' })
  expiresAt!: Date;
  @Column({ name: 'revoked_at', type: 'timestamptz', nullable: true })
  revokedAt!: Date | null;
  @Column({
    name: 'revocation_reason',
    type: 'varchar',
    length: 64,
    nullable: true,
  })
  revocationReason!: string | null;
}
