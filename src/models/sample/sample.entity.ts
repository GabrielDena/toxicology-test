import { Entity, Column, PrimaryColumn, Unique } from "typeorm";
import { Length, ValidateIf, IsNotEmpty } from 'class-validator';

@Entity({ name: 'samples' })
@Unique(['sample_code'])
class Sample {
	@PrimaryColumn("varchar", { unique: true })
	@Length(1, 8)
	sample_code: string

	@Column("float")
	cocaine: number

	@Column("float")
	amphetamine: number

	@Column("float")
	methamphetamine: number

	@Column("float")
	mda: number

	@Column("float")
	mdma: number

	@Column("float")
	thc: number

	@Column("float")
	morphine: number

	@Column("float")
	codeine: number

	@Column("float")
	heroine: number

	@ValidateIf(o => o.cocaine != null)
	@IsNotEmpty()
	@Column("float")
	benzoylecgonine: number

	@ValidateIf(o => o.cocaine != null)
	@IsNotEmpty()
	@Column("float")
	cocaethylene: number

	@ValidateIf(o => o.cocaine != null)
	@IsNotEmpty()
	@Column("float")
	norcocaine: number

}

export default Sample
