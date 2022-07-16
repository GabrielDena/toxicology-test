import { IsNotEmpty, IsOptional, IsString, MaxLength, ValidateIf } from "class-validator"

export class CreateSampleDto {
	@IsString()
	@IsNotEmpty({ message: 'Código da amostra obrigatório.' })
	@MaxLength(8, { message: 'Código da amostra não pode ser maior que 8 caracteres.' })
	sample_code: string

	@IsOptional()
	created_at?: string

	@IsOptional()
	result?: boolean

	@IsOptional()
	cocaine?: number

	@IsOptional()
	amphetamine?: number

	@IsOptional()
	methamphetamine?: number

	@IsOptional()
	mda?: number

	@IsOptional()
	mdma?: number

	@IsOptional()
	thc?: number

	@IsOptional()
	morphine?: number

	@IsOptional()
	codeine?: number

	@IsOptional()
	heroine?: number

	@ValidateIf(o => o.cocaine != null)
	@IsNotEmpty({ message: 'Benzoylecgonine obrigatória se cocaína cadastrada.' })
	benzoylecgonine?: number

	@ValidateIf(o => o.cocaine != null)
	@IsNotEmpty({ message: 'Cocaethylene obrigatória se cocaína cadastrada.' })
	cocaethylene?: number

	@ValidateIf(o => o.cocaine != null)
	@IsNotEmpty({ message: 'Norcocaine obrigatória se cocaína cadastrada.' })
	norcocaine?: number
}
