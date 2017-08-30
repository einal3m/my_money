class PatternCommands
  def create(params)
    pattern = Pattern.create(params)
    pattern.id
  end

  def update(pattern, params)
    pattern.update(params)
  end

  def delete(pattern)
    pattern.delete
  end
end
