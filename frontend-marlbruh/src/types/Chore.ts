type Chore = {
  id: number;
  name: string;
  icon: string;
  users: User[];
  complete: boolean;
  description: string | undefined;
};
