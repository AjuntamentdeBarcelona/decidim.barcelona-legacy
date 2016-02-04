class Recommendations::PreferencesMatrix
  def initialize(store, scales=[], subject_ids=[])
    @store = store
    @scales = scales
    @subject_ids = subject_ids
  end

  def result
    @result ||= compute_result
  end

  def save
    @store.save(result)
  end

  def load
    @result = @store.load
  end

  private

  def compute_result
    @scales.inject({}) do |result, scale|
      @subject_ids.each do |subject_id|
        if result[subject_id].nil?
          result[subject_id] = {}
        end
        weight = scale.weight_for(subject_id)
        result[subject_id][scale.object_id] = weight if weight > 0
      end
      result
    end
  end
end
