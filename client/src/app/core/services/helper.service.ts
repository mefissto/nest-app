export class HelperService {
  public static resetMaterializeInputs(): void {
    document
      .querySelectorAll('label.active')
      .forEach(label => label.classList.remove('active'));
  }
}
