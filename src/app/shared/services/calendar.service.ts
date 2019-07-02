import { Observable, of } from 'rxjs';

export class CalendarService {
  private readonly weeklyPlanning = [
    {
      header: '',
      week: [{
        day: 'Friday',
        // tslint:disable-next-line:max-line-length
        description: 'You are technically and menthally prepared to the adventure. All is set up. Your assignments will be available on Monday',
        actions: [{
          description: 'Get and read the welcome email from RemoteCamp management',
          duration: 10
        }, {
          description: 'Check all the accesses (todo: add which exactly)',
          duration: 20
        }, {
          description: 'Report non-working accesses to the RemoteCamp SEM',
          duration: 30
        }, {
          description: 'Kick-off call',
          duration: 10
        }, {
          description: 'Read "Quality and common terms we use"',
          url: 'https://drive.google.com/open?id=13x4k7OlM-qoZIfwnr3FqeQKpMBmOJ5VD0IEsGiSMOvM',
          duration: 15
        }]
      }]
    }, {
      header: '',
      week: [{
        day: 'Monday',
        // tslint:disable-next-line:max-line-length
        description: 'You know your plan for this week. You are technically and menthally prepared to the adventure. All is set up. Your assignments will be available on Monday',
        actions: [{
          description: 'Get the list of assignments (jira) and go through it',
          duration: 15
        }, {
          description: 'Make a weekly plan of deliveries. Recommended distribution of load is: 10/30/30/20/10+fix+catchup.',
          duration: 10
        }, {
          description: 'CiC with Manager',
          duration: 10
        }, {
          // tslint:disable-next-line:max-line-length
          description: 'Ask technical questions, setup projects, understand the requirements to the job done (IQBs), watch and read technical documentation applicable to your track',
          duration: 15
        }, {
          description: 'Development work',
          duration: 10
        }]
      }, {
        day: 'Tuesday',
        description: 'You know your failures',
        actions: [{
          description: 'Read "Seek Continuous Improvement / Experiment"',
          url: 'https://drive.google.com/open?id=1-4Zoh9MeXadFMxmF9sgsaP-4jK0VWCFBrr7urCaenDA',
          duration: 10
        }, {
          description: 'Check the results of your submissions. Identify the hardest problem.',
          url: '',
          duration: 20
        }, {
          description: 'CiC with Manager',
          url: '',
          duration: 30
        }, {
          description: 'Development work',
          url: '',
          duration: 20
        }, {
          description: 'Make TMS video of 1 unit produced',
          url: 'https://drive.google.com/file/d/0BzSXGty9sV6KRGp1aHNPa2dkWTQ/view',
          duration: 10
        }]
      }, {
        day: 'Wednesday',
        description: 'You know your failures',
        actions: [{
          description: 'Read "Seek Continuous Improvement / Experiment"',
          url: 'https://drive.google.com/open?id=1-4Zoh9MeXadFMxmF9sgsaP-4jK0VWCFBrr7urCaenDA',
          duration: 10
        }, {
          description: 'Check the results of your submissions. Identify the hardest problem.',
          url: '',
          duration: 20
        }, {
          description: 'CiC with Manager',
          url: '',
          duration: 30
        }, {
          description: 'Development work',
          url: '',
          duration: 20
        }, {
          description: 'Make TMS video of 1 unit produced',
          url: 'https://drive.google.com/file/d/0BzSXGty9sV6KRGp1aHNPa2dkWTQ/view',
          duration: 10
        }]
      }, {
        day: 'Thursday',
        description: 'You know your failures',
        actions: [{
          description: 'Read "Seek Continuous Improvement / Experiment"',
          url: 'https://drive.google.com/open?id=1-4Zoh9MeXadFMxmF9sgsaP-4jK0VWCFBrr7urCaenDA',
          duration: 10
        }, {
          description: 'Check the results of your submissions. Identify the hardest problem.',
          url: '',
          duration: 20
        }, {
          description: 'CiC with Manager',
          url: '',
          duration: 30
        }, {
          description: 'Development work',
          url: '',
          duration: 20
        }, {
          description: 'Make TMS video of 1 unit produced',
          url: 'https://drive.google.com/file/d/0BzSXGty9sV6KRGp1aHNPa2dkWTQ/view',
          duration: 10
        }]
      }, {
        day: 'Friday',
        description: 'You know your failures',
        actions: [{
          description: 'Read "Seek Continuous Improvement / Experiment"',
          url: 'https://drive.google.com/open?id=1-4Zoh9MeXadFMxmF9sgsaP-4jK0VWCFBrr7urCaenDA',
          duration: 10
        }, {
          description: 'Check the results of your submissions. Identify the hardest problem.',
          url: '',
          duration: 20
        }, {
          description: 'CiC with Manager',
          url: '',
          duration: 30
        }, {
          description: 'Development work',
          url: '',
          duration: 20
        }, {
          description: 'Make TMS video of 1 unit produced',
          url: 'https://drive.google.com/file/d/0BzSXGty9sV6KRGp1aHNPa2dkWTQ/view',
          duration: 10
        }]
      }]
    }, {
      header: 'Productivity vs. week 1 increased +25%',
      week: [{
        day: 'Monday',
        description: 'You know your plan for this week',
        actions: [{
          description: 'Get the list of assignments (jira) and go through it',
          duration: 15
        }, {
          description: 'Make a weekly plan of deliveries. Recommended distribution of load is: 10/30/30/20/10+fix+catchup.',
          duration: 10
        }, {
          description: 'CiC with Manager',
          duration: 10
        }, {
          // tslint:disable-next-line:max-line-length
          description: 'Ask technical questions, setup projects, understand the requirements to the job done (IQBs), watch and read technical documentation applicable to your track',
          duration: 15
        }, {
          description: 'Development work',
          duration: 10
        }]
      }, {
        day: 'Tuesday',
        description: 'You know your failures',
        actions: [{
          description: 'Read "Seek Continuous Improvement / Experiment"',
          url: 'https://drive.google.com/open?id=1-4Zoh9MeXadFMxmF9sgsaP-4jK0VWCFBrr7urCaenDA',
          duration: 10
        }, {
          description: 'Check the results of your submissions. Identify the hardest problem.',
          url: '',
          duration: 20
        }, {
          description: 'CiC with Manager',
          url: '',
          duration: 30
        }, {
          description: 'Development work',
          url: '',
          duration: 20
        }, {
          description: 'Make TMS video of 1 unit produced',
          url: 'https://drive.google.com/file/d/0BzSXGty9sV6KRGp1aHNPa2dkWTQ/view',
          duration: 10
        }]
      }, {
        day: 'Wednesday',
        description: 'You know your failures',
        actions: [{
          description: 'Read "Seek Continuous Improvement / Experiment"',
          url: 'https://drive.google.com/open?id=1-4Zoh9MeXadFMxmF9sgsaP-4jK0VWCFBrr7urCaenDA',
          duration: 10
        }, {
          description: 'Check the results of your submissions. Identify the hardest problem.',
          url: '',
          duration: 20
        }, {
          description: 'CiC with Manager',
          url: '',
          duration: 30
        }, {
          description: 'Development work',
          url: '',
          duration: 20
        }, {
          description: 'Make TMS video of 1 unit produced',
          url: 'https://drive.google.com/file/d/0BzSXGty9sV6KRGp1aHNPa2dkWTQ/view',
          duration: 10
        }]
      }, {
        day: 'Thursday',
        description: 'You know your failures',
        actions: [{
          description: 'Read "Seek Continuous Improvement / Experiment"',
          url: 'https://drive.google.com/open?id=1-4Zoh9MeXadFMxmF9sgsaP-4jK0VWCFBrr7urCaenDA',
          duration: 10
        }, {
          description: 'Check the results of your submissions. Identify the hardest problem.',
          url: '',
          duration: 20
        }, {
          description: 'CiC with Manager',
          url: '',
          duration: 30
        }, {
          description: 'Development work',
          url: '',
          duration: 20
        }, {
          description: 'Make TMS video of 1 unit produced',
          url: 'https://drive.google.com/file/d/0BzSXGty9sV6KRGp1aHNPa2dkWTQ/view',
          duration: 10
        }]
      }, {
        day: 'Friday',
        description: 'You know your failures',
        actions: [{
          description: 'Read "Seek Continuous Improvement / Experiment"',
          url: 'https://drive.google.com/open?id=1-4Zoh9MeXadFMxmF9sgsaP-4jK0VWCFBrr7urCaenDA',
          duration: 10
        }, {
          description: 'Check the results of your submissions. Identify the hardest problem.',
          url: '',
          duration: 20
        }, {
          description: 'CiC with Manager',
          url: '',
          duration: 30
        }, {
          description: 'Development work',
          url: '',
          duration: 20
        }, {
          description: 'Make TMS video of 1 unit produced',
          url: 'https://drive.google.com/file/d/0BzSXGty9sV6KRGp1aHNPa2dkWTQ/view',
          duration: 10
        }]
      }]
    }, {
      header: 'Productivity vs. week 2 increased +25%',
      week: [{
        day: 'Monday',
        description: 'You know your plan for this week',
        actions: [{
          description: 'Get the list of assignments (jira) and go through it',
          duration: 15
        }, {
          description: 'Make a weekly plan of deliveries. Recommended distribution of load is: 10/30/30/20/10+fix+catchup.',
          duration: 10
        }, {
          description: 'CiC with Manager',
          duration: 10
        }, {
          // tslint:disable-next-line:max-line-length
          description: 'Ask technical questions, setup projects, understand the requirements to the job done (IQBs), watch and read technical documentation applicable to your track',
          duration: 15
        }, {
          description: 'Development work',
          duration: 10
        }]
      }, {
        day: 'Tuesday',
        description: 'You know your failures',
        actions: [{
          description: 'Read "Seek Continuous Improvement / Experiment"',
          url: 'https://drive.google.com/open?id=1-4Zoh9MeXadFMxmF9sgsaP-4jK0VWCFBrr7urCaenDA',
          duration: 10
        }, {
          description: 'Check the results of your submissions. Identify the hardest problem.',
          url: '',
          duration: 20
        }, {
          description: 'CiC with Manager',
          url: '',
          duration: 30
        }, {
          description: 'Development work',
          url: '',
          duration: 20
        }, {
          description: 'Make TMS video of 1 unit produced',
          url: 'https://drive.google.com/file/d/0BzSXGty9sV6KRGp1aHNPa2dkWTQ/view',
          duration: 10
        }]
      }, {
        day: 'Wednesday',
        description: 'You know your failures',
        actions: [{
          description: 'Read "Seek Continuous Improvement / Experiment"',
          url: 'https://drive.google.com/open?id=1-4Zoh9MeXadFMxmF9sgsaP-4jK0VWCFBrr7urCaenDA',
          duration: 10
        }, {
          description: 'Check the results of your submissions. Identify the hardest problem.',
          url: '',
          duration: 20
        }, {
          description: 'CiC with Manager',
          url: '',
          duration: 30
        }, {
          description: 'Development work',
          url: '',
          duration: 20
        }, {
          description: 'Make TMS video of 1 unit produced',
          url: 'https://drive.google.com/file/d/0BzSXGty9sV6KRGp1aHNPa2dkWTQ/view',
          duration: 10
        }]
      }, {
        day: 'Thursday',
        description: 'You know your failures',
        actions: [{
          description: 'Read "Seek Continuous Improvement / Experiment"',
          url: 'https://drive.google.com/open?id=1-4Zoh9MeXadFMxmF9sgsaP-4jK0VWCFBrr7urCaenDA',
          duration: 10
        }, {
          description: 'Check the results of your submissions. Identify the hardest problem.',
          url: '',
          duration: 20
        }, {
          description: 'CiC with Manager',
          url: '',
          duration: 30
        }, {
          description: 'Development work',
          url: '',
          duration: 20
        }, {
          description: 'Make TMS video of 1 unit produced',
          url: 'https://drive.google.com/file/d/0BzSXGty9sV6KRGp1aHNPa2dkWTQ/view',
          duration: 10
        }]
      }, {
        day: 'Friday',
        description: 'You know your failures',
        actions: [{
          description: 'Read "Seek Continuous Improvement / Experiment"',
          url: 'https://drive.google.com/open?id=1-4Zoh9MeXadFMxmF9sgsaP-4jK0VWCFBrr7urCaenDA',
          duration: 10
        }, {
          description: 'Check the results of your submissions. Identify the hardest problem.',
          url: '',
          duration: 20
        }, {
          description: 'CiC with Manager',
          url: '',
          duration: 30
        }, {
          description: 'Development work',
          url: '',
          duration: 20
        }, {
          description: 'Make TMS video of 1 unit produced',
          url: 'https://drive.google.com/file/d/0BzSXGty9sV6KRGp1aHNPa2dkWTQ/view',
          duration: 10
        }]
      }]
    }, {
      header: 'Productivity vs. week 3 increased +25%',
      week: [{
        day: 'Monday',
        description: 'You know your plan for this week',
        actions: [{
          description: 'Get the list of assignments (jira) and go through it',
          duration: 15
        }, {
          description: 'Make a weekly plan of deliveries. Recommended distribution of load is: 10/30/30/20/10+fix+catchup.',
          duration: 10
        }, {
          description: 'CiC with Manager',
          duration: 10
        }, {
          // tslint:disable-next-line:max-line-length
          description: 'Ask technical questions, setup projects, understand the requirements to the job done (IQBs), watch and read technical documentation applicable to your track',
          duration: 15
        }, {
          description: 'Development work',
          duration: 10
        }]
      }, {
        day: 'Tuesday',
        description: 'You know your failures',
        actions: [{
          description: 'Read "Seek Continuous Improvement / Experiment"',
          url: 'https://drive.google.com/open?id=1-4Zoh9MeXadFMxmF9sgsaP-4jK0VWCFBrr7urCaenDA',
          duration: 10
        }, {
          description: 'Check the results of your submissions. Identify the hardest problem.',
          url: '',
          duration: 20
        }, {
          description: 'CiC with Manager',
          url: '',
          duration: 30
        }, {
          description: 'Development work',
          url: '',
          duration: 20
        }, {
          description: 'Make TMS video of 1 unit produced',
          url: 'https://drive.google.com/file/d/0BzSXGty9sV6KRGp1aHNPa2dkWTQ/view',
          duration: 10
        }]
      }, {
        day: 'Wednesday',
        description: 'You know your failures',
        actions: [{
          description: 'Read "Seek Continuous Improvement / Experiment"',
          url: 'https://drive.google.com/open?id=1-4Zoh9MeXadFMxmF9sgsaP-4jK0VWCFBrr7urCaenDA',
          duration: 10
        }, {
          description: 'Check the results of your submissions. Identify the hardest problem.',
          url: '',
          duration: 20
        }, {
          description: 'CiC with Manager',
          url: '',
          duration: 30
        }, {
          description: 'Development work',
          url: '',
          duration: 20
        }, {
          description: 'Make TMS video of 1 unit produced',
          url: 'https://drive.google.com/file/d/0BzSXGty9sV6KRGp1aHNPa2dkWTQ/view',
          duration: 10
        }]
      }, {
        day: 'Thursday',
        description: 'You know your failures',
        actions: [{
          description: 'Read "Seek Continuous Improvement / Experiment"',
          url: 'https://drive.google.com/open?id=1-4Zoh9MeXadFMxmF9sgsaP-4jK0VWCFBrr7urCaenDA',
          duration: 10
        }, {
          description: 'Check the results of your submissions. Identify the hardest problem.',
          url: '',
          duration: 20
        }, {
          description: 'CiC with Manager',
          url: '',
          duration: 30
        }, {
          description: 'Development work',
          url: '',
          duration: 20
        }, {
          description: 'Make TMS video of 1 unit produced',
          url: 'https://drive.google.com/file/d/0BzSXGty9sV6KRGp1aHNPa2dkWTQ/view',
          duration: 10
        }]
      }, {
        day: 'Friday',
        description: 'You know your failures',
        actions: [{
          description: 'Read "Seek Continuous Improvement / Experiment"',
          url: 'https://drive.google.com/open?id=1-4Zoh9MeXadFMxmF9sgsaP-4jK0VWCFBrr7urCaenDA',
          duration: 10
        }, {
          description: 'Check the results of your submissions. Identify the hardest problem.',
          url: '',
          duration: 20
        }, {
          description: 'CiC with Manager',
          url: '',
          duration: 30
        }, {
          description: 'Development work',
          url: '',
          duration: 20
        }, {
          description: 'Make TMS video of 1 unit produced',
          url: 'https://drive.google.com/file/d/0BzSXGty9sV6KRGp1aHNPa2dkWTQ/view',
          duration: 10
        }]
      }]
    }];

  public getWeeklyPlanning(): Observable<any> {
    return of(this.weeklyPlanning);
  }

  public saveAction(complete: boolean): Observable<any> {
    return of('');
  }
}
