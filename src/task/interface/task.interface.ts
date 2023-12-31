import ProjectEntity from 'src/project/project.entity';

export class ICreateTask {
  name: string;
  description: string;
  parentTask?: string;
  project: ProjectEntity;
  progress?: number;
  weight?: number;
}
