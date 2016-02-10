# Compute a preferences matrix for a collection of subjects and objects. Each row 
# corresponds to a subject and each column to an object. The intersection between
# is the object's weight to that subject. It doesn't store 0 weight values.
#
# A visual representation of this matrix could be:
#
# {
#   "1" => { "1" => 10, "2" => 5, "5" => 8 },
#   "2" => { "1" => 4 , "2" => 2           },
#   "3" => { "1" => 6 , "3" => 5, "4" => 1 }
# }
class Recommendations::PreferencesMatrix
  def initialize(store, scales=[], subject_ids=[])
    @store = store
    @scales = scales
    @subject_ids = subject_ids
  end

  # Public
  #
  # Memoize the computed result
  def result
    @result ||= compute_result
  end

  # Public
  #
  # Delegates save action to the store object
  def save
    @store.save(result)
  end

  # Public
  #
  # Delegates load action to the store object
  def load
    @result = @store.load
  end

  private

  # Private
  #
  # Compute the preferences matrix. It uses the collection of
  # scales to weight each subject and store the result if that 
  # weight is not 0.
  def compute_result
    @scales.inject({}) do |result, scale|
      @subject_ids.each do |subject_id|
        if result[subject_id].nil?
          result[subject_id] = {}
        end
        weight = scale.weight_for(subject_id)
        result[subject_id][scale.object_id] = weight if weight != 0
      end
      result
    end
  end
end
