import { Entity, Column, PrimaryColumn, Unique, OneToMany } from "typeorm";
import { Substance } from '../../substance/entities/substance.entity';

@Entity({ name: 'samples' })
@Unique(['sample_code'])
export class Sample {
	@PrimaryColumn("varchar")
	sample_code: string

	@Column('varchar')
	created_at: string

	@Column('boolean', { default: () => false })
	result: boolean

	@OneToMany(type => Substance, substance => substance.sample)
	substances: Substance[]
}
