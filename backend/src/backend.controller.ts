import { Controller, Get } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'

@Controller()
@ApiTags('app')
export class BackendController {
  @Get('healthcheck')
  @ApiOperation({ summary: 'Validar a saúde do serviço' })
  @ApiOkResponse({ type: String })
  async healthcheck(): Promise<string> {
    return 'OK'
  }
}
