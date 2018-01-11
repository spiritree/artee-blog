
import { Controller, Get } from 'trafficlight'
import { HomeService } from '../service'

@Controller('/')
export default class HomeController {
  @Get('')
  public getInfo(): string {
    return HomeService.default()
  }
}