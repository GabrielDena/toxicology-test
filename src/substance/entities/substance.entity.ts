import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Unique } from "typeorm";
import { Sample } from '../../sample/entities/sample.entity';

@Entity({ name: 'substances' })
@Unique(['substance', 'sample'])
export class Substance {
	@PrimaryGeneratedColumn()
	id: number

	@Column("varchar")
	substance: string

	@Column("float")
	value: number

	@ManyToOne(type => Sample)
	@JoinColumn({ name: "sample_code" })
	sample: Sample
}
