import {TestBed, inject} from '@angular/core/testing';

import {UtilsService} from './utils.service';

describe('UtilsService', () => {
    let service: UtilsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [UtilsService]
        });
        service = TestBed.get(UtilsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('isPipelineWithGithubAccount', () => {
        it('should return QA Manual Tester pipeline as Pipeline without Github Account', () => {
            const result = service.isPipelineWithGithubAccount('qa manual tester');
            expect(result).toBeFalsy();
        });

        it('should return Software Tester pipeline as Pipeline without Github Account', () => {
            const result = service.isPipelineWithGithubAccount('software tester');
            expect(result).toBeFalsy();
        });

        it('should return Java Software Architect pipeline as Pipeline with Github Account', () => {
            const result = service.isPipelineWithGithubAccount('Java Software Architect');
            expect(result).toBeTruthy();
        });

        it('should throw error for not defined pipeline', () => {
            expect(() => {
                    service.isPipelineWithGithubAccount('');
                }
            ).toThrow(new Error('pipeline argument is not set'));
        });
    });


});
